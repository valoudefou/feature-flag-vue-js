<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

# Dynamic Application Form Configuration – App, Solutions and Documentation

This documentation shows an example for an **Interactive Application Form Configuration System**, widely used across industries to streamline application and lead generation.  
The solution demonstrates real-time control of form behavior through JSON-based configuration, with **feature experimentation** powered by AB Tasty.

---

## 📌 Overview

The form configuration system allows developers and business users to:

- Dynamically control form field visibility and validation rules.  
- Use progressive disclosure patterns to guide users and reduce cognitive load.  
- Automatically populate fields with data from external partner sources.  
- Conduct A/B tests to compare and optimize different form experiences.  
- Send data to analytics to make informed, data-driven decisions 

---

## 1. Configuration Structure

The system uses a **reactive configuration object** to define form fields:

```javascript
const visitor = reactive({
  original: { formConfig: { fields: {...} } },
  variation1: { formConfig: { fields: {...} } },
  variation2: { formConfig: { fields: {...} } }
})
```

### Field Properties

| Property       | Type               | Description |
|---------------|-------------------|-------------|
| `showWhen`    | `boolean \| string`| Controls conditional field visibility |
| `required`    | `boolean`          | Determines if the field is mandatory (displays a red asterisk for required fields) |
| `placeholder` | `string`           | Guidance text displayed in the field |
| `label`       | `string`           | Field display name |
| `visible`     | `boolean`          | Controls whether the field is visible or not |
| `autoPopulate`| `string`           | Pre-fills field from external data partner sources |

---

## 2. Configuration Variations

The system supports multiple form flow patterns:

### **Original**
- **Flow:** All fields visible simultaneously.
- **Pattern:** Traditional form layout.
- **Use Case:** Baseline user experience.

### **Variation 1 – Grouped Progressive Disclosure**
- **Flow:** Fields appear in logical groups after dependencies are met.
- **Pattern:** Dependants → Address Fields → Monthly Housing Cost → Employment Fields.
- **Use Case:** Reduced cognitive load through chunking.

### **Variation 2 – Sequential Progressive Disclosure**
- **Flow:** Strictly controlled, fully customizable sequential field display.
- **Pattern:** Title → First Name → Last Name → Date of Birth → etc.
- **Use Case:** Guided step-by-step completion.

---

## 3. Implementation Benefits

- **Flexibility:** Runtime configuration changes without redeployment.
- **Experimentation:** Easy A/B testing of different form flows.
- **User Experience:** Progressive disclosure reduces abandonment.
- **Maintainability:** Centralized configuration management.
- **Data Integration:** Auto-population from external sources.

---

## 4. Usage Examples

### Basic Field Configuration

```json
{
  "dependants": {
    "showWhen": "maritalStatus",
    "required": true,
    "placeholder": "Number of dependants",
    "label": "Number of Dependants",
    "visible": true,
    "autoPopulate": ""
  }
}
```

### Conditional Field Display

```json
{
  "residentialStatus": {
    "showWhen": "dependants", /// Display the residential status field only when the dependants field has a value
    "required": true, // Mark the field as required and display a red asterisk
    "placeholder": "Choose residential status", // Display placeholder text inside the field before user interaction
    "label": "Residential Status",
    "visible": true, // Determine whether the field should be shown
    "autoPopulate": "" // Automatically populate the field with a value from an external partner source
  }
}
```

### Auto-Population from External Source

```json
{
  "firstName": {
    "showWhen": false,
    "required": true,
    "placeholder": "Enter first name",
    "label": "First Name", 
    "visible": true,
    "autoPopulate": "{{user.firstName}}"
  }
}
```

---

## 📄 License
This documentation is publicly available and free to use with no restrictions.
