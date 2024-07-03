import express from 'express';
import cors from 'cors';
import { checkConnection } from './db_config.js';

const app = express();
const PORT = 3000;

const connection = checkConnection();

app.use(cors({credentials: true, origin: ["http://localhost:5173"] }));
app.use(express.json());

app.post('/login', async (req, res) =>{
    const {username, password} = req.body;

    const query = 'SELECT * FROM users WHERE username=? AND password =? LIMIT 1';

    connection.query(query, [username, password], (error, results, fields) => {
        if (error){
            console.error('Error executing query:', error);
            res.status(500).json({error: 'Internal server error'});
            return;
        }

        if (results.length > 0) {
            res.json(true)
        } else{
            res.json(false);
        }
    });
});

app.get('/user/get-all', async (req, res) => {
    const { username, name } = req.body;
    const query = 'SELECT username, name FROM users';

    connection.query(query, [username, name], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json(results); // Return the product details
        } else {
            res.json(false);
        }
    });
});

app.post('/products/get-by-id', async (req, res) => {
    const { product_id } = req.body;

    const query = 'SELECT * FROM products WHERE product_id = ? LIMIT 1';

    connection.query(query, [product_id], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json(results); // Return the product details
        } else {
            res.json(false);
        }
    });
});

app.get('/products/get-all', async (req, res) => {

    const query = 'SELECT * FROM products';

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json(results); // Return the product details
        } else {
            res.json(false);
        }
    });
});

app.post('/products/delete-by-id', async (req, res) => {
    const { product_id } = req.body;

    console.log('Received product_id for deletion:', product_id);

    if (!product_id) {
        res.status(400).json({ error: 'product_id is required' });
        return;
    }

    const query = 'DELETE FROM products WHERE product_id = ?';

    connection.query(query, [product_id], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        console.log('Delete results:', results);

        if (results.affectedRows > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

app.post('/products/update-by-id', async (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;

    if (!product_id || !product_name || quantity == null || !unit || price == null) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    const query = 'UPDATE products SET product_name = ?, quantity = ?, unit = ?, price = ? WHERE product_id = ?';

    connection.query(query, [product_name, quantity, unit, price, product_id], (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.affectedRows > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

app.post('/products/add-product', async (req, res) => {
    const { product_id, product_name, quantity, unit, price } = req.body;

    if (!product_id || !product_name || quantity == null || !unit || price == null) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

   
    const productExists = 'SELECT * FROM products WHERE product_id = ? OR product_name = ?';
    connection.query(productExists, [product_id, product_name], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error executing query:', checkError);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (checkResults.length > 0) {
            res.json({ exist: true, success: false });
        } else {

            const insertQuery = 'INSERT INTO products (product_id, product_name, quantity, unit, price) VALUES (?, ?, ?, ?, ?)';
            connection.query(insertQuery, [product_id, product_name, quantity, unit, price], (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error executing query:', insertError);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                res.json({ exist: false, success: true});
            });
        }
    });
});






















app.get('/', (req, res) => {
    res.send('Hello from your Express app!');
});


app.get('/users/check-user', (req, res) => {
    res.send('This is a check-user route');
});

app.get('/products/get-info/:product_ID', (req, res) => {
    const product_ID = req.params.product_ID;
    res.send(`This is a sample product info route for ${product_ID}`);
});

app.get('/products/get-all', (req, res) => {
    res.send('This is a sample product route');
});

app.get('/reports/get-monthly', (req, res) => {
    res.send('This is a sample monthly route');
});

app.get('/reports/get-yearly', (req, res) => {
    res.send('This is a sample yearly route');
});

app.post('/users/check-user', (req, res) => {
    const {username, password} = req.body;
    res.send(`Username: ${username} Password: ${password}`);
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});