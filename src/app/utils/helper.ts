import prisma from "../shared/prisma";

export const generateOrderId = async (): Promise<string> => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);

    const lastOrder = await prisma.order.findFirst({
        where: {
            order_id: {
                startsWith: `ORD${month}${year}`
            }
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    let new_order_id;

    if (lastOrder) {
        const lastSequence = parseInt(lastOrder.order_id.slice(-6)) || 0;
        const newSequence = String(lastSequence + 1).padStart(6, '0');

        new_order_id = `ORD${month}${year}${newSequence}`;
    } else {
        new_order_id = `ORD${month}${year}000001`;
    }

    return new_order_id;
}