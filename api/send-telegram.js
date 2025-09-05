export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { nombre, telefono, direccion, carrito } = req.body;

        const token = process.env.TELEGRAM_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const mensaje =
            `📦 *Nuevo Pedido*\n` +
            `👤 Nombre: ${nombre}\n` +
            `📞 Teléfono: ${telefono}\n` +
            `📍 Dirección: ${direccion}\n` +
            `🛒 Productos:\n${carrito}`;

        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: mensaje,
                parse_mode: "Markdown"
            })
        });

        const data = await response.json();
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
