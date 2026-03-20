export async function runIntegration(taskName, promise) {
    try {
        return await promise;
    } catch (err) {
        console.error(`Integration misslyckades [${taskName}]:`, err.message);
        return null; // Returnera null så att huvudflödet kan fortsätta
    }
}
