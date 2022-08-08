module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        console.log(`Golem Ronan pret | ${client.user.tag}`);
    }
}