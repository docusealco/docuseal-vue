import { defineComponent, h } from "vue";

export default defineComponent({
  name: "DocusealForm",
  props: {
    src: {
      type: String,
      required: false,
      default: "",
    },
    host: {
      type: String,
      required: false,
      default: "cdn.docuseal.co",
    },
    role: {
      type: String,
      required: false,
      default: "",
    },
    logo: {
      type: String,
      required: false,
      default: "",
    },
    language: {
      type: String,
      required: false,
      default: "",
    },
    // Backward compatibility
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
    preview: {
      type: Boolean,
      required: false,
      default: false,
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
    applicationKey: {
      type: String,
      required: false,
      default: "",
    },
    externalId: {
      type: String,
      required: false,
      default: "",
    },
    completedRedirectUrl: {
      type: String,
      required: false,
      default: "",
    },
    withTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    withFieldNames: {
      type: Boolean,
      required: false,
      default: true,
    },
    withSendCopyButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withDownloadButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    allowToResubmit: {
      type: Boolean,
      required: false,
      default: true,
    },
    allowTypedSignature: {
      type: Boolean,
      required: false,
      default: true,
    },
    completedButton: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    goToLast: {
      type: Boolean,
      required: false,
      default: true,
    },
    skipFields: {
      type: Boolean,
      required: false,
      default: false,
    },
    values: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    readonlyFields: {
      type: Array,
      required: false,
      default: () => [],
    },
    customCss: {
      type: String,
      required: false,
      default: ""
    },
  },
  emits: ["complete"],
  mounted() {
    const scriptId = "docuseal-form-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = `https://${this.host}/js/form.js`;

      document.head.appendChild(script);
    }

    this.$el.addEventListener("completed", (e: CustomEvent) =>
      this.$emit("complete", e.detail),
    );
  },
  render() {
    return h("docuseal-form", {
      "data-src": this.src,
      "data-email": this.email,
      "data-role": this.role || this.submitter,
      "data-expand": this.expand,
      "data-preview": this.preview,
      "data-go-to-last": this.goToLast,
      "data-with-title": this.withTitle,
      "data-logo": this.logo,
      "data-language": this.language,
      "data-with-field-names": this.withFieldNames,
      "data-external-id": this.externalId || this.applicationKey,
      "data-completed-redirect-url": this.completedRedirectUrl,
      "data-with-download-button": this.withDownloadButton,
      "data-allow-to-resubmit": this.allowToResubmit,
      "data-allow-typed-signature": this.allowTypedSignature,
      "data-with-send-copy-button": this.withSendCopyButton,
      "data-skip-fields": this.skipFields,
      "data-values": JSON.stringify(this.values),
      "data-readonly-fields": this.readonlyFields.join(","),
      "data-completed-button-title": this.completedButton.title,
      "data-completed-button-url": this.completedButton.url,
      "data-background-color": this.backgroundColor,
      "data-custom-css": this.customCss,
    });
  },
});
