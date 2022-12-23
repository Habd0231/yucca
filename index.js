const express = require('express')
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json()

const PORT = 3000

const app = express()

const tickets = [
    { "transport": "Train 78A", "origin": "Madrid", "destiny": "Barcelona", "seat": "45B" },
    { "transport": "Flight SK455", "origin": "Gerona Airport", "destiny": "Stockholm", "seat": "3A", "extra": "Baggage drop at ticket counter 344." },
    { "transport": "Flight SK22", "origin": "Stockholm", "destiny": "New York JFK", "gate": "22B", "seat": "7B", "extra": "Baggage will we automatically transferred from your last leg." },
    { "transport": "Airport Bus", "origin": "Barcelona", "destiny": "Gerona Airport" },
];
function sortTickets(tickets2) {
    let sortedTickets = [];
    let visited = new Set();
    // Find the starting point

    let start;
    for (const ticket of tickets2) {
        if (!tickets2.find(t => t.destiny === ticket.origin)) {
            start = ticket;
            break;
        }
    }
    let currentTicket = start;
    
    while (currentTicket) {
        console.log(currentTicket)
        sortedTickets.push(currentTicket);
        visited.add(currentTicket);
        currentTicket = tickets2.find(ticket => ticket.origin === currentTicket.destiny && !visited.has(ticket));
    }
    
    return sortedTickets
}
app.get('/sort', (req, res) => {
    const resultat = sortTickets(tickets);
    res.json(resultat)})


app.post('/add', jsonParser, (req, res) => {
    console.log(req.body)
   tickets.push(req.body
)

const resultat = sortTickets(tickets);
    res.json(resultat)


})    

app.listen(PORT, () => console.log(`listening to ${PORT}`))
