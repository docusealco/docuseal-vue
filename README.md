# DocuSeal Vue Components

This package provides a convenient way to embed [DocuSeal](https://www.docuseal.com) into Vue apps. Sign documents and create document forms directly in your apps.

![Docuseal Form](https://github.com/docusealco/docuseal-vue/assets/1176367/828f9f53-3131-494c-8e37-5c74fa94cfa8)
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

### Template Builder

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
