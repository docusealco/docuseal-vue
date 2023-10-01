import { defineComponent, h } from "vue";

export default defineComponent({
  name: "DocusealBuilder",
  props: {
    token: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: false,
      default: "cdn.docuseal.co",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "",
    },
  },
  mounted() {
    const scriptId = "docuseal-builder-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = `https://${this.host}/js/builder.js`;

      document.head.appendChild(script);
    }
  },
  render() {
    return h("docuseal-builder", {
      "data-token": this.token,
      "data-background-color": this.backgroundColor,
    });
  },
});
