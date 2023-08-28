const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secretKey = process.env.DOCUSEAL_API_KEY;

app.post('/api/docuseal/builder_token', (req, res) => {
  const token = jwt.sign({
    user_email: 'your-docuseal-user-email@company.com',
    integration_email: 'customer@example.com', // replace with current user email
    name: 'Integration W-9 Test Form',
    document_urls: ['https://www.irs.gov/pub/irs-pdf/fw9.pdf'],
  }, secretKey);

  res.json({ token });
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
