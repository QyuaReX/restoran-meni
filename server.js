const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

// Omogućava frontendu da šalje zahtjeve prema ovom serveru
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Konfiguracija konekcije na bazu (prilagodi šifru svojim postavkama)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'tvoja_sifra', // Lokalna šifra za tvoj MacBook
    database: process.env.DB_NAME || 'digitalni_meni',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// API Endpoint koji vraća cijeli meni na osnovu slug-a restorana
app.get('/api/meni/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;

        // 1. Povuci podatke o restoranu
        const [restorani] = await pool.query('SELECT * FROM restorani WHERE slug = ?', [slug]);

        if (restorani.length === 0) {
            return res.status(404).json({ poruka: 'Restoran nije pronađen' });
        }

        const restoran = restorani[0];

        // 2. Povuci kategorije za taj restoran
        const [kategorije] = await pool.query(
            'SELECT * FROM kategorije WHERE restoran_id = ? ORDER BY redoslijed',
            [restoran.id]
        );

        // 3. Povuci sve DOSTUPNE artikle za te kategorije
        const [artikli] = await pool.query(`
            SELECT a.* 
            FROM artikli a
            JOIN kategorije k ON a.kategorija_id = k.id
            WHERE k.restoran_id = ? AND a.dostupno = TRUE
        `, [restoran.id]);

        // Složi JSON odgovor koji frontend očekuje
        res.json({
            restoran: restoran,
            kategorije: kategorije,
            artikli: artikli
        });

    } catch (error) {
        console.error('Greška pri dohvaćanju menija:', error);
        res.status(500).json({ poruka: 'Greška na serveru' });
    }
});

// Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server uspješno pokrenut na http://localhost:${PORT}`);
    console.log(`📌 Testiraj API na: http://localhost:${PORT}/api/meni/restoran-lounge`);
});