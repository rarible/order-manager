import { Configuration } from "@rarible/ethereum-api-client"
import { OrderControllerApi } from "@rarible/ethereum-api-client/build/apis/OrderControllerApi"

const configuration = new Configuration({
  basePath: "https://ethereum-api.rarible.org",
})

export const api = {
  order: new OrderControllerApi(configuration),
}
