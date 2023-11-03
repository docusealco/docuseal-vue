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
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    withRecipientsButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withSignYourselfButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    customButton: {
      type: Object,
      required: false,
      default: () => ({ title: "", url: "" }),
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
      "data-preview": this.preview,
      "data-background-color": this.backgroundColor,
      "data-custom-button-title": this.customButton.title,
      "data-custom-button-url": this.customButton.url,
      "data-with-recipients-button": this.withRecipientsButton,
      "data-with-sign-yourself-button": this.withSignYourselfButton,
    });
  },
});
