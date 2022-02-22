export default {
    server_port: 1234,
    db_url: 'mongodb+srv://username31:password@cluster0.igbza.mongodb.net/databaseName?retryWrites=true&w=majority',
    saltWorkFactor: 10,
    accessTokenTtl: '1h',
    refreshTokenTtl: '30d',
    jwt_secret: 'someSecret',
    publicKey: `-----BEGIN PUBLIC KEY-----
    publicKey
    -----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
    privateKey
    -----END RSA PRIVATE KEY-----`,
}