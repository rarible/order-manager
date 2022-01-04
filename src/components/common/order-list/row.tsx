import type { Asset, AssetType, Erc1155AssetType, Erc721AssetType, Order } from "@rarible/ethereum-api-client"
import { toBn } from "@rarible/utils"
import React from "react"
import styled from "styled-components"
import { formatDecimal } from "../../../utils/format-decimal"
import { getAssetLinkOpensea, getAssetLinkRarible } from "../../../utils/get-asset-link"
import { Link } from "../link"
import { Touchable } from "../touchable"

export type OrderRowProps = {
  order: Order
  index: number
  onCancel: ((order: Order) => void) | undefined
}

export function OrderRow({ order, index, onCancel }: OrderRowProps) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <AssetEntry asset={order.take} />
      </td>
      <td>
        <AssetEntry asset={order.make} />
      </td>
      <td>
        <Menu>
          {onCancel && (
            <li>
              <Button onClick={() => onCancel(order)}>Cancel</Button>
            </li>
          )}
          {isEthereumAsset(order.make.assetType) && (
            <React.Fragment>
              <Link
                href={getAssetLinkRarible(order.make.assetType.contract, order.make.assetType.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  <Button>Rarible</Button>
                </li>
              </Link>
              <Link
                href={getAssetLinkOpensea(order.make.assetType.contract, order.make.assetType.tokenId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  <Button>Opensea</Button>
                </li>
              </Link>
            </React.Fragment>
          )}
        </Menu>
      </td>
    </tr>
  )
}

const Menu = styled.ul`
  display: flex;
  flex-flow: row wrap;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`

const Button = styled(Touchable)`
  font-size: 16px;
  color: ${p => p.theme.colors.primary};
`

type AssetEntryProps = {
  asset: Asset
}

function AssetEntry({ asset }: AssetEntryProps) {
  return (
    <div>
      <ul>
        <li>Type: {asset.assetType.assetClass}</li>
        {isEthereumAsset(asset.assetType) ? (
          <React.Fragment>
            <li>Contract: {asset.assetType.contract}</li>
            <li>Id: {asset.assetType.tokenId}</li>
          </React.Fragment>
        ) : null}
        {asset.valueDecimal ? (
          <li>Value: {formatDecimal(toBn(asset.valueDecimal.toString()).toNumber())}</li>
        ) : (
          <li>Value: None</li>
        )}
      </ul>
    </div>
  )
}

function isEthereumAsset(x: AssetType): x is Erc721AssetType | Erc1155AssetType {
  return x.assetClass === "ERC721" || x.assetClass === "ERC1155"
}
