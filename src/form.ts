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
      default: "cdn.docuseal.com",
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
    orderAsOnPage: {
      type: Boolean,
      required: false,
      default: false,
    },
    minimize: {
      type: Boolean,
      required: false,
      default: false,
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
    name: {
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
    withDecline: {
      type: Boolean,
      required: false,
      default: false,
    },
    withFieldNames: {
      type: Boolean,
      required: false,
      default: true,
    },
    withFieldPlaceholder: {
      type: Boolean,
      required: false,
      default: false,
    },
    withSendCopyButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withCompleteButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    sendCopyEmail: {
      type: Boolean,
      required: false,
      default: null,
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
    signature: {
      type: String,
      required: false,
      default: '',
    },
    rememberSignature: {
      type: Boolean,
      required: false,
      default: false,
    },
    reuseSignature: {
      type: Boolean,
      required: false,
      default: true,
    },
    completedMessage: {
      type: Object,
      required: false,
      default: () => ({}),
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
    autoscrollFields: {
      type: Boolean,
      required: false,
      default: true,
    },
    values: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    i18n: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    metadata: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },
    readonlyFields: {
      type: Array,
      required: false,
      default: () => [],
    },
    customCss: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["complete", "init", "load", "decline"],
  mounted() {
    const scriptId = "docuseal-form-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = `https://${this.host}/js/form.js`;

      document.head.appendChild(script);
    }

    this.$el.addEventListener("completed", (e: CustomEvent) => {
      this.$emit("complete", e.detail);
    });

    this.$el.addEventListener("declined", (e: CustomEvent) => {
      this.$emit("decline", e.detail);
    });

    this.$el.addEventListener("load", (e: CustomEvent) => {
      this.$emit("load", e.detail);
    });

    this.$el.addEventListener("init", () => {
      this.$emit("init");
    });
  },
  render() {
    return h("docuseal-form", {
      "data-src": this.src,
      "data-email": this.email,
      "data-name": this.name,
      "data-role": this.role || this.submitter,
      "data-expand": this.expand,
      "data-order-as-on-page": this.orderAsOnPage,
      "data-minimize": this.minimize,
      "data-preview": this.preview,
      "data-go-to-last": this.goToLast,
      "data-with-title": this.withTitle,
      "data-with-decline": this.withDecline,
      "data-logo": this.logo,
      "data-language": this.language,
      "data-with-field-names": this.withFieldNames,
      "data-with-field-placeholder": this.withFieldPlaceholder,
      "data-external-id": this.externalId || this.applicationKey,
      "data-completed-redirect-url": this.completedRedirectUrl,
      "data-with-download-button": this.withDownloadButton,
      "data-allow-to-resubmit": this.allowToResubmit,
      "data-allow-typed-signature": this.allowTypedSignature,
      "data-signature": this.signature,
      "data-remember-signature": this.rememberSignature,
      "data-reuse-signature": this.reuseSignature,
      "data-with-send-copy-button": this.withSendCopyButton,
      "data-with-complete-button": this.withCompleteButton,
      "data-send-copy-email": this.sendCopyEmail,
      "data-skip-fields": this.skipFields,
      "data-autoscroll-fields": this.autoscrollFields,
      "data-values": JSON.stringify(this.values),
      "data-i18n": JSON.stringify(this.i18n),
      "data-metadata": JSON.stringify(this.metadata),
      "data-fields": JSON.stringify(this.fields),
      "data-readonly-fields": this.readonlyFields.join(","),
      "data-completed-message-title": this.completedMessage.title,
      "data-completed-message-body": this.completedMessage.body,
      "data-completed-button-title": this.completedButton.title,
      "data-completed-button-url": this.completedButton.url,
      "data-background-color": this.backgroundColor,
      "data-custom-css": this.customCss,
    });
  },
});
