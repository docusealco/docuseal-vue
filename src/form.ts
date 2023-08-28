import { defineComponent, h } from "vue";

export default defineComponent({
  name: "DocusealForm",
  props: {
    src: {
      type: String,
      required: false,
      default: "",
    },
    submitter: {
      type: String,
      required: false,
      default: "",
    },
    expand: {
      type: Boolean,
      required: false,
      default: true,
    },
    email: {
      type: String,
      required: false,
      default: "",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "",
    },
  },
  mounted() {
    const scriptId = "docuseal-form-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = "https://cdn.docuseal.co/js/form.js";

      document.head.appendChild(script);
    }
  },
  render() {
    return h("docuseal-form", {
      "data-src": this.src,
      "data-email": this.email,
      "data-submitter": this.submitter,
      "data-expand": this.expand,
      "data-background-color": this.backgroundColor,
    });
  },
});
