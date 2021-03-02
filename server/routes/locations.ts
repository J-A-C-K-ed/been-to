// get all locations
app.get('/locations', (req, res) => res.status(200).json());

// add a location
app.post('/locations', (req, res) => res.status(200).json());

// add a location
app.delete('/locations', (req, res) => res.status(200).json());
