import { useState, useEffect } from 'react';
import './Frotas.css';

const STORAGE_KEY = 'frotas';

const emptyForm = {
  placa: '',
  modelo: '',
  ano: '',
  capacidade: '',
  status: 'Ativo',
};

function Frotas() {
  const [frotas, setFrotas] = useState([]);
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'delete'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setFrotas(stored);
  }, []);

  const persist = (data) => {
    setFrotas(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setModal('add');
  };

  const openEdit = (frota) => {
    setForm({ ...frota });
    setEditId(frota.id);
    setModal('edit');
  };

  const openDelete = () => {
    setDeleteId(null);
    setModal('delete');
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const nova = { ...form, id: Date.now() };
    persist([...frotas, nova]);
    setModal(null);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const atualizadas = frotas.map((f) => (f.id === editId ? { ...form, id: editId } : f));
    persist(atualizadas);
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(frotas.filter((f) => f.id !== deleteId));
    setModal(null);
  };

  const filtered = frotas.filter(
    (f) =>
      f.placa.toLowerCase().includes(search.toLowerCase()) ||
      f.modelo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Frotas</h1>
          <p className="page-sub">Gerencie os veículos da frota</p>
        </div>
        <div className="page-actions">
          <button className="btn-action btn-add" onClick={openAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar
          </button>
          <button className="btn-action btn-edit" onClick={() => filtered.length > 0 && openEdit(filtered[0])} disabled={frotas.length === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
          <button className="btn-action btn-delete" onClick={openDelete} disabled={frotas.length === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Excluir
          </button>
        </div>
      </div>

      <div className="search-bar-wrap">
        <input
          className="search-bar"
          placeholder="Buscar por placa ou modelo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <p>Nenhuma frota cadastrada</p>
            <button className="btn-action btn-add" onClick={openAdd}>Adicionar frota</button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Capacidade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id}>
                  <td><span className="badge-placa">{f.placa}</span></td>
                  <td>{f.modelo}</td>
                  <td>{f.ano}</td>
                  <td>{f.capacidade} pass.</td>
                  <td>
                    <span className={`status-badge ${f.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>
                      {f.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="row-btn row-edit" onClick={() => openEdit(f)} title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="row-btn row-delete" onClick={() => { setDeleteId(f.id); setModal('delete-confirm'); }} title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL ADICIONAR */}
      {modal === 'add' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Adicionar Frota</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <form onSubmit={handleSubmitAdd} className="modal-form">
              <div className="form-group">
                <label>Placa *</label>
                <input required placeholder="ABC-1234" value={form.placa} onChange={(e) => setForm({ ...form, placa: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Modelo *</label>
                <input required placeholder="Ex: Volkswagen 17.230" value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ano *</label>
                  <input required type="number" placeholder="2024" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Capacidade *</label>
                  <input required type="number" placeholder="45" value={form.capacidade} onChange={(e) => setForm({ ...form, capacidade: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>Em manutenção</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn-confirm btn-add">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {modal === 'edit' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Frota</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="select-hint">Selecione o veículo a editar:</div>
            <div className="select-list">
              {frotas.map((f) => (
                <div
                  key={f.id}
                  className={`select-item ${editId === f.id ? 'selected' : ''}`}
                  onClick={() => { setEditId(f.id); setForm({ ...f }); }}
                >
                  <span className="badge-placa">{f.placa}</span>
                  <span>{f.modelo}</span>
                  <span className={`status-badge ${f.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>{f.status}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmitEdit} className="modal-form">
              <div className="form-group">
                <label>Placa *</label>
                <input required value={form.placa} onChange={(e) => setForm({ ...form, placa: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Modelo *</label>
                <input required value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ano *</label>
                  <input required type="number" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Capacidade *</label>
                  <input required type="number" value={form.capacidade} onChange={(e) => setForm({ ...form, capacidade: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Ativo</option>
                  <option>Inativo</option>
                  <option>Em manutenção</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
                <button type="submit" className="btn-confirm btn-edit" disabled={!editId}>Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR (lista de seleção) */}
      {modal === 'delete' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Excluir Frota</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Selecione o veículo que deseja excluir:</p>
            <div className="select-list">
              {frotas.map((f) => (
                <div
                  key={f.id}
                  className={`select-item select-item-delete ${deleteId === f.id ? 'selected-delete' : ''}`}
                  onClick={() => setDeleteId(f.id)}
                >
                  <span className="badge-placa">{f.placa}</span>
                  <span>{f.modelo}</span>
                  <span className={`status-badge ${f.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}`}>{f.status}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-confirm btn-delete" onClick={handleDelete} disabled={!deleteId}>Confirmar Exclusão</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EXCLUIR RÁPIDO (via botão da linha) */}
      {modal === 'delete-confirm' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <p className="modal-desc">Tem certeza que deseja excluir o veículo <strong>{frotas.find(f => f.id === deleteId)?.placa}</strong>? Esta ação não pode ser desfeita.</p>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-confirm btn-delete" onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Frotas;
