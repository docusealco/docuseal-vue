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
    language: {
      type: String,
      required: false,
      default: "en",
    },
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    autosave: {
      type: Boolean,
      required: false,
      default: true,
    },
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },
    requiredFields: {
      type: Array,
      required: false,
      default: () => [],
    },
    i18n: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    roles: {
      type: Array,
      required: false,
      default: () => [],
    },
    fieldTypes: {
      type: Array,
      required: false,
      default: () => [],
    },
    drawFieldType: {
      type: String,
      required: false,
      default: "text",
    },
    withRecipientsButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    sendCopyEmail: {
      type: Boolean,
      required: false,
      default: null,
    },
    withSendButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    onlyDefinedFields: {
      type: Boolean,
      required: false,
      default: false,
    },
    withUploadButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withAddPageButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    withSignYourselfButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    withDocumentsList: {
      type: Boolean,
      required: false,
      default: true,
    },
    withFieldsList: {
      type: Boolean,
      required: false,
      default: true,
    },
    withFieldPlaceholder: {
      type: Boolean,
      required: false,
      default: false,
    },
    customButton: {
      type: Object,
      required: false,
      default: () => ({ title: "", url: "" }),
    },
    sendButtonText: {
      type: String,
      required: false,
      default: "",
    },
    saveButtonText: {
      type: String,
      required: false,
      default: "",
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "",
    },
    customCss: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["load", "upload", "send", "init", "change", "save"],
  mounted() {
    const scriptId = "docuseal-builder-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");

      script.id = scriptId;
      script.async = true;
      script.src = `https://${this.host}/js/builder.js`;

      document.head.appendChild(script);
    }

    this.$el.addEventListener("load", (e: CustomEvent) =>
      this.$emit("load", e.detail),
    );

    this.$el.addEventListener("upload", (e: CustomEvent) =>
      this.$emit("upload", e.detail),
    );

    this.$el.addEventListener("send", (e: CustomEvent) =>
      this.$emit("send", e.detail),
    );

    this.$el.addEventListener("save", (e: CustomEvent) =>
      this.$emit("save", e.detail),
    );

    this.$el.addEventListener("change", (e: CustomEvent) =>
      this.$emit("change", e.detail),
    );

    this.$el.addEventListener("init", () => this.$emit("init"));
  },
  render() {
    return h("docuseal-builder", {
      "data-token": this.token,
      "data-preview": this.preview,
      "data-language": this.language,
      "data-autosave": this.autosave,
      "data-send-button-text": this.sendButtonText,
      "data-save-button-text": this.saveButtonText,
      "data-send-copy-email": this.sendCopyEmail,
      "data-roles": this.roles.join(","),
      "data-field-types": this.fieldTypes.join(","),
      "data-draw-field-type": this.drawFieldType,
      "data-fields": JSON.stringify(this.fields),
      "data-required-fields": JSON.stringify(this.requiredFields),
      "data-background-color": this.backgroundColor,
      "data-custom-button-title": this.customButton.title,
      "data-custom-button-url": this.customButton.url,
      "data-with-recipients-button": this.withRecipientsButton,
      "data-with-send-button": this.withSendButton,
      "data-with-title": this.withTitle,
      "data-with-i18n": this.i18n,
      "data-only-defined-fields": this.onlyDefinedFields,
      "data-with-upload-button": this.withUploadButton,
      "data-with-add-page-button": this.withAddPageButton,
      "data-with-documents-list": this.withDocumentsList,
      "data-with-fields-list": this.withFieldsList,
      "data-with-field-placeholder": this.withFieldPlaceholder,
      "data-with-sign-yourself-button": this.withSignYourselfButton,
      "data-custom-css": this.customCss,
    });
  },
});
