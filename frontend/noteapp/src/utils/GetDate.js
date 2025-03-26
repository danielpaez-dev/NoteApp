export default function getDate(dateString = null) {
    const date = dateString ? new Date(dateString) : new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Para que siempre tenga dos dígitos
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}-${month}-${year}`;
}