const express = require('express');
const cors = require('cors');
const db = require('./db/db.js');

const app = express();
const port = 3001; // Porta do backend

app.use(cors());
app.use(express.json());

// Rota para login de usuário
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca o usuário pelo e-mail
        const userResult = await db.query(
            'SELECT id, nome, senha_hash FROM sgcpd_schema.usuarios WHERE email = $1',
            [email]
        );

        // Se o usuário não for encontrado
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }

        const user = userResult.rows[0];

        if (user.senha_hash === password) {
            res.json({ message: 'Login bem-sucedido!', userId: user.id, userName: user.nome });
        } else {
            res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});

// Rota para buscar todas as notas
app.get('/api/notes', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                n.id,
                n.titulo,
                n.conteudo,
                n.status,
                n.data_criacao,
                n.data_atualizacao,
                ARRAY_AGG(c.nome) AS categorias
            FROM 
                sgcpd_schema.notas n
            LEFT JOIN 
                sgcpd_schema.notas_categorias nc ON n.id = nc.nota_id
            LEFT JOIN 
                sgcpd_schema.categorias c ON nc.categoria_id = c.id
            GROUP BY 
                n.id
            ORDER BY 
                n.data_atualizacao DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar notas.' });
    }
});

// Rota para criar uma nova nota
app.post('/api/notes', async (req, res) => {
    const { titulo, conteudo, status, usuario_id, categorias } = req.body;
    try {
        await db.query('BEGIN');

        // Insere a nota e retorna o ID
        const notaResult = await db.query(
            'INSERT INTO sgcpd_schema.notas (titulo, conteudo, status, usuario_id) VALUES ($1, $2, $3, $4) RETURNING id',
            [titulo, conteudo, status, usuario_id]
        );
        const notaId = notaResult.rows[0].id;

        // Vincula as categorias
        if (categorias && categorias.length > 0) {
            for (const catNome of categorias) {
                const categoriaResult = await db.query('SELECT id FROM sgcpd_schema.categorias WHERE nome = $1', [catNome]);
                if (categoriaResult.rows.length > 0) {
                    const categoriaId = categoriaResult.rows[0].id;
                    await db.query(
                        'INSERT INTO sgcpd_schema.notas_categorias (nota_id, categoria_id) VALUES ($1, $2)',
                        [notaId, categoriaId]
                    );
                }
            }
        }
        await db.query('COMMIT');
        res.status(201).json({ id: notaId, message: 'Nota criada com sucesso!' });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar nota.' });
    }
});

// Rota para atualizar uma nota
app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, status, categorias } = req.body;
    try {
        await db.query('BEGIN');

        await db.query(
            `UPDATE sgcpd_schema.notas 
             SET titulo = COALESCE($1, titulo), 
                 conteudo = COALESCE($2, conteudo), 
                 status = COALESCE($3, status) 
             WHERE id = $4`,
            [titulo, conteudo, status, id]
        );

        await db.query('COMMIT');
        res.json({ message: 'Nota atualizada com sucesso!' });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar nota.' });
    }
});

// Rota para deletar uma nota
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM sgcpd_schema.notas WHERE id = $1', [id]);
        res.json({ message: 'Nota deletada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar nota.' });
    }
});

app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});