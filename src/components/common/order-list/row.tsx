import type {
  Asset,
  AssetType,
  BigNumber,
  Erc1155AssetType,
  Erc1155LazyAssetType,
  Erc721AssetType,
  Erc721LazyAssetType,
  Order,
} from "@rarible/ethereum-api-client"
import { toBn } from "@rarible/utils"
import React, { useMemo } from "react"
import styled from "styled-components"
import { useRx } from "@rixio/react"
import type { Wrapped } from "@rixio/wrapped"
import { formatDecimal } from "../../../utils/format-decimal"
import { getAssetLinkRarible } from "../../../utils/get-asset-link"
import { ExternalLink } from "../link"
import { Touchable } from "../touchable"
import { useAppContext } from "../../../business/context"
import type { ItemData } from "../../../business/service/item"
import { cutString } from "../../../utils/cut-string"

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
        <AssetEntry asset={order.make} />
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

type AssetEntryProps = {
  asset: Asset
}

function AssetEntry({ asset }: AssetEntryProps) {
  if (isNftAsset(asset.assetType)) {
    return <NftAssetEntry valueDecimal={asset.valueDecimal} asset={asset.assetType} />
  }
  return <GenericAsset asset={asset} />
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
  asset: Erc721AssetType | Erc721LazyAssetType | Erc1155LazyAssetType | Erc1155AssetType
  valueDecimal: BigNumber | undefined
}

function NftAssetEntry({ asset, valueDecimal }: NftAssetEntryProps) {
  const { itemService } = useAppContext()
  const data$ = useMemo(() => itemService.getItemData(asset), [asset, itemService])
  const data = useRx(data$)
  const name = renderName(data)

  return (
    <NftProps>
      <ExternalLink href={getAssetLinkRarible(asset.contract, asset.tokenId)}>
        <li>
          <Title title={name}>{name}</Title>
        </li>
      </ExternalLink>
      <li>Contract: {asset.contract}</li>
      <li>Id: {cutString(asset.tokenId, 16)}</li>
      <li>Value: {getAssetValue(valueDecimal)}</li>
    </NftProps>
  )
}

const NftProps = styled.ul`
  max-width: 460px;
`

const Title = styled.span`
  display: block;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

function renderName(data: Wrapped<ItemData>) {
  if (data.status === "fulfilled") return `${data.value.collection.name} - ${data.value.item.meta?.name}`
  if (data.status === "pending") return "Loading.."
  if (data.status === "rejected") return "Untitled"
}

type GenericAssetProps = {
  asset: Asset
}

function GenericAsset({ asset }: GenericAssetProps) {
  return (
    <ul>
      <li>Type: {asset.assetType.assetClass}</li>
      <li>Value: {getAssetValue(asset.valueDecimal)}</li>
    </ul>
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

function getAssetValue(value: BigNumber | undefined) {
  if (value) {
    return formatDecimal(toBn(value.toString()).toNumber())
  }
  return "None"
}
