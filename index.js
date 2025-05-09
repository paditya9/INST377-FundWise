const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
const supabaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/', (req, res) => {
res.sendFile('/public/home.html', {root: __dirname});
});

// QUOTES
app.get('/api/quote', async (req, res) => {
const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
headers: { 
    'X-Api-Key': process.env.API_NINJAS_KEY }
});
const data = await response.json();
res.json(data); 
});

// NEWS
app.get('/api/news', async (req, res) => {
const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c9227ba296ff4356adb93d9f5047c1d3', {
headers: { 
    'X-Api-Key': process.env.API_NEWS_KEY }
});
const data = await response.json();
res.json(data); 
});

// SEARCHES
app.post('/api/recent-searches', async (req, res) => {
    const { query } = req.body;
    await supabase
        .from('recent_searches')
        .insert([{ query }]);
    
    res.end(); 
});

app.get('/api/recent-searches', async (req, res) => {
    const { data } = await supabase
        .from('recent_searches')
        .select('query')
        .order('created_at', { ascending: false })
        .limit(3);

    res.json(data || []);
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});

// app.get('/customers', async (req, res) => {
//     console.log("Attempting to GET all Customer")

//     const {data, error } = await supabase.from('customers').select()
//     if (error){
//         console.log(`Error:  ${error}`);
//         res.send(error)
//     }
//     res.send(data)
// });

// app.post('/customer', async (req, res) => {
//     console.log("Adding Customer");

//     console.log(req.body);
//     const customer_fname = req.body.customer_fname;
//     const customer_lname = req.body.customer_lname;

//     const {data, error} = await supabase
//         .from('customers')
//         .insert({
//             customer_fname: customer_fname, 
//             customer_lname:customer_lname 
//         })
//         .select();

//     res.send(data);
// });


