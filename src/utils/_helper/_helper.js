export function normalizeFormData(body, fieldsToJSON = [], ignoreFields = []) {
    const normalized = {};

    for (const [key, value] of Object.entries(body)) {
        if(ignoreFields.length && ignoreFields.includes(key)) {
            normalized[key] = value;
            continue;
        }

        if (fieldsToJSON.includes(key)) {
            try {
                normalized[key] = JSON.parse(value);
            } catch (err) {
                normalized[key] = [];
            }
            continue;
        }

        if (value === 'true') {
            normalized[key] = true;
        } else if (value === 'false') {
            normalized[key] = false;
        } else if (!isNaN(value) && value.trim() !== '') {
            normalized[key] = Number(value);
        } else {
            normalized[key] = value;
        }
    }

    return normalized;
}