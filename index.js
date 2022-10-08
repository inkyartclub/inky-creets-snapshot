const axios = require("axios");

const TOKEN_IDS = {
  PAULYP: "0.0.981406",
  SHEESH: "0.0.981435",
  THE_BEAWR: "0.0.981457",
  GALACTOT: "0.0.981525",
  REACHIT: "0.0.981583"
}

const MIRRORNODE = 'https://mainnet-public.mirrornode.hedera.com'

const balanceUrlForToken = (token_id) => `${MIRRORNODE}/api/v1/tokens/${token_id}/balances?account.balance=gte:1&timestamp=1665187200`

// A function that fetches the users that hold a given NFT
const getAccountsThatHoldToken = async (token_id, currentIds = [], nextUrl) => {

  const url = nextUrl ? MIRRORNODE + nextUrl : balanceUrlForToken(token_id)

  const { data } = await axios.get(url)
  const { balances } = data

  const newIds = balances.map(balance => balance.account)
  const updated = [ ...currentIds, ...newIds]

  if (!data.links.next) {
    console.log(`Total owners of ${token_id} - ${updated.length}`);
    return updated
  }

  return getAccountsThatHoldToken(token_id, updated, data.links.next)
}

const calculateIntersectedTokensForCollectors = async () => {

  console.log("I don't know if you should do this...")
  const paulyp = await getAccountsThatHoldToken(TOKEN_IDS.PAULYP)

  console.log("Do you honestly think this is a good idea?")
  const sheesh = await getAccountsThatHoldToken(TOKEN_IDS.SHEESH)

  console.log("We're warning you this will only end up going badly")
  const bwear = await getAccountsThatHoldToken(TOKEN_IDS.THE_BEAWR)

  console.log("Seriously stop now, NOTHING good will come of this")
  const galactot = await getAccountsThatHoldToken(TOKEN_IDS.GALACTOT)

  console.log("OK, I warned you -- it has been done -- this is the way.")
  const reachit = await getAccountsThatHoldToken(TOKEN_IDS.REACHIT)

  const demonicNFTs = [paulyp, sheesh, bwear, galactot, reachit]

  const intersect = (a, b) => a.filter(e => b.includes(e));

  return demonicNFTs.reduce(intersect);
}

calculateIntersectedTokensForCollectors().then(collectors => {
  console.log("Listing the degenerate collector ids");

  console.log(collectors)
  console.log(collectors.length)
})

