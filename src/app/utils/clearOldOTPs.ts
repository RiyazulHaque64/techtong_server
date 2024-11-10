import prisma from "../shared/prisma";

const clearOldOTPs = async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    const deletedOtps = await prisma.userOTP.deleteMany({
      where: {
        created_at: {
          lt: tenMinutesAgo,
        },
      },
    });
    console.log(`Deleted ${deletedOtps.count} old OTPs`);
  } catch (error) {
    console.error("Error deleting old OTPs:", error);
  }
};

export default clearOldOTPs;
