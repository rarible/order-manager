import type {
  Asset,
  AssetType,
  Erc1155AssetType,
  Erc1155LazyAssetType,
  Erc721AssetType,
  Erc721LazyAssetType,
  Order,
} from "@rarible/ethereum-api-client"
import { toBn } from "@rarible/utils"
import React from "react"
import styled from "styled-components"
import { useRx } from "@rixio/react"
import { formatDecimal } from "../../../utils/format-decimal"
import { getAssetLinkRarible } from "../../../utils/get-asset-link"
import { Link } from "../link"
import { Touchable } from "../touchable"
import { useAppContext } from "../../../business/context"

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
        <NftAssetEntry asset={order.make} />
      </td>
      <td>
        <AssetEntry asset={order.take} />
      </td>
      <td>
        <Menu>
          {onCancel && (
            <li>
              <Button onClick={() => onCancel(order)}>Cancel</Button>
            </li>
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

type NftAssetEntryProps = {
  asset: Asset
}

function NftAssetEntry({ asset }: NftAssetEntryProps) {
  const { itemService } = useAppContext()
  const itemData = useRx(itemService.getItemData(asset.assetType), [asset.assetType])

  return (
    <div>
      <ul>
        <li>
          {isNftAsset(asset.assetType) && (
            <Link
              href={getAssetLinkRarible(asset.assetType.contract, asset.assetType.tokenId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <Button>
                  {itemData.status === "fulfilled"
                    ? `${itemData.value.collection.name} - ${itemData.value.item.meta?.name}`
                    : itemData.status}
                </Button>
              </li>
            </Link>
          )}
        </li>
        {asset.valueDecimal ? (
          <li>Value: {formatDecimal(toBn(asset.valueDecimal.toString()).toNumber())}</li>
        ) : (
          <li>Value: None</li>
        )}
      </ul>
    </div>
  )
}

type AssetEntryProps = {
  asset: Asset
}

function AssetEntry({ asset }: AssetEntryProps) {
  return (
    <div>
      <ul>
        <li>Type: {asset.assetType.assetClass}</li>
        {isNftAsset(asset.assetType) ? (
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

function isNftAsset(
  x: AssetType,
): x is Erc721AssetType | Erc1155AssetType | Erc721LazyAssetType | Erc1155LazyAssetType {
  return (
    x.assetClass === "ERC721" ||
    x.assetClass === "ERC1155" ||
    x.assetClass === "ERC721_LAZY" ||
    x.assetClass === "ERC1155_LAZY"
  )
}
