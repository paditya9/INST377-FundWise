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

app.get('/customers', async (req, res) => {
    console.log("Attempting to GET all Customer")

    const {data, error } = await supabase.from('customers').select()
    if (error){
        console.log(`Error:  ${error}`);
        res.send(error)
    }
    res.send(data)
});

app.post('/customer', async (req, res) => {
    console.log("Adding Customer");

    console.log(req.body);
    const customer_fname = req.body.customer_fname;
    const customer_lname = req.body.customer_lname;

    const {data, error} = await supabase
        .from('customers')
        .insert({
            customer_fname: customer_fname, 
            customer_lname:customer_lname 
        })
        .select();
    
    res.send(data);
});


app.listen(port, () => {
    console.log("Application is live on the port: " + port);
});  