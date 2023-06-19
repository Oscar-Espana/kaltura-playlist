import kaltura from "kaltura-client";
const config = new kaltura.Configuration();
config.serviceUrl = "https://www.kaltura.com";
const clientKaltura = new kaltura.Client(config);
export default clientKaltura;
