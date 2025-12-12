import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const emptyTicket = { title: '', eventDate: '', price: '', quantity: '' };

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newTicket, setNewTicket] = useState(emptyTicket);
  const [editingId, setEditingId] = useState(null);
  const [editTicket, setEditTicket] = useState(emptyTicket);

  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/tickets`);
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError('Could not load tickets');
    } finally {
      setLoading(false);
    }
  }

  async function createTicket(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newTicket,
          price: Number(newTicket.price),
          quantity: Number(newTicket.quantity),
        }),
      });
      if (!res.ok) throw new Error('Create failed');
      setNewTicket(emptyTicket);
      await loadTickets();
    } catch (err) {
      setError('Could not create ticket');
    }
  }

  function startEdit(ticket) {
    setEditingId(ticket._id);
    setEditTicket({
      title: ticket.title,
      eventDate: ticket.eventDate?.slice(0, 10) || '',
      price: ticket.price,
      quantity: ticket.quantity,
    });
  }

  async function saveEdit(id) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editTicket,
          price: Number(editTicket.price),
          quantity: Number(editTicket.quantity),
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      setEditingId(null);
      setEditTicket(emptyTicket);
      await loadTickets();
    } catch (err) {
      setError('Could not update ticket');
    }
  }

  async function deleteTicket(id) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/tickets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await loadTickets();
    } catch (err) {
      setError('Could not delete ticket');
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Ticket Manager (MERN)</h1>
      <p>API: {API_URL}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h2>Create ticket</h2>
        <form onSubmit={createTicket} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
          <label>
            Title
            <input
              type="text"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              required
            />
          </label>
          <label>
            Event date
            <input
              type="date"
              value={newTicket.eventDate}
              onChange={(e) => setNewTicket({ ...newTicket, eventDate: e.target.value })}
              required
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={newTicket.price}
              onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
              required
              min="0"
            />
          </label>
          <label>
            Quantity
            <input
              type="number"
              value={newTicket.quantity}
              onChange={(e) => setNewTicket({ ...newTicket, quantity: e.target.value })}
              required
              min="0"
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Tickets</h2>
        <button onClick={loadTickets} disabled={loading}>
          Refresh
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : tickets.length === 0 ? (
          <p>No tickets</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) =>
                editingId === t._id ? (
                  <tr key={t._id}>
                    <td>
                      <input
                        value={editTicket.title}
                        onChange={(e) => setEditTicket({ ...editTicket, title: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editTicket.eventDate}
                        onChange={(e) =>
                          setEditTicket({ ...editTicket, eventDate: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editTicket.price}
                        onChange={(e) => setEditTicket({ ...editTicket, price: e.target.value })}
                        min="0"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editTicket.quantity}
                        onChange={(e) =>
                          setEditTicket({ ...editTicket, quantity: e.target.value })
                        }
                        min="0"
                      />
                    </td>
                    <td>
                      <button onClick={() => saveEdit(t._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={t._id}>
                    <td>{t.title}</td>
                    <td>{t.eventDate ? t.eventDate.slice(0, 10) : ''}</td>
                    <td>{t.price}</td>
                    <td>{t.quantity}</td>
                    <td>
                      <button onClick={() => startEdit(t)}>Edit</button>
                      <button onClick={() => deleteTicket(t._id)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
