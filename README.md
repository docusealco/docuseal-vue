# DocuSeal Vue Components

[📙 Documentation](https://www.docuseal.com/docs/embedded/form#vue) | [🚀 Demo App](https://embed.docuseal.tech/)

This package provides a convenient way to embed [DocuSeal](https://www.docuseal.com) into Vue apps. Sign documents and create document forms directly in your apps.

[Embedded Signing Form](#signing-form) 

![Signing Form](https://github.com/user-attachments/assets/5c92b842-7687-4341-88a1-64ac26c1e2e0)

[Embedded Form Builder](#form-builder) 

![Form Builder](https://github.com/user-attachments/assets/7645a4fb-7399-4cce-bb90-e077a8a1ce95)

## Installation

```bash
npm install @docuseal/vue
```

## Documentation

For detailed documentation, please click [here](https://www.docuseal.com/docs/embedded).

## Usage

### Signing Form

Copy public DocuSeal form URL from [https://docuseal.com](https://docuseal.com) and use it in the `src` component prop:

```vue
<template>
// ...
  <DocusealForm
    :src="'https://docuseal.com/d/LEVGR9rhZYf86M'"
    :email="'signer@example.com'"
  />
// ...
</template>

<script>
// ...
import { DocusealForm } from '@docuseal/vue'

export default {
  name: 'App',
  components: {
    DocusealForm
  },

// ...

}
</script>
```

### Form Builder

```vue
<template>
// ...
  <DocusealBuilder
    v-if="token"
    :token="token"
  />
// ...
</template>

<script>
// ...
import { DocusealBuilder } from '@docuseal/vue'

export default {
  name: 'App',
  components: {
    DocusealBuilder
  },
  mounted () {
    this.loadToken()
  },
  methods: {
    loadToken () {
      fetch('/api/docuseal/builder_token', {
        method: 'POST'
      }).then(async (resp) => {
        const data = await resp.json()

        this.token = data.token
      })
    }
  }

// ...

}
</script>
```

To protect the template builder from unathorized access a secure token (JWT) should be generated on the back-end:

```js
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
```

Obtain secret API token (`DOCUSEAL_API_KEY` env variable) to sign JWT from [https://console.docuseal.com/api](https://console.docuseal.com/api).

# License

MIT
