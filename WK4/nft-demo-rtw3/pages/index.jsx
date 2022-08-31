import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import {NFTCard} from './components/NFTCard'


const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  // data passed to nftCard to differentiate nftCards (via id= and name= tags)
  // don't need to use useState because variables are not shown on screen.
  let data = [];
  let counter = 0;

  // This is pagination for getNFT as required in the written guide.
  // pagination for getNFTForCollection works using another parameter.
  const [pageKey, setPageKey] = useState("");

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");

    const api_key = "LpaM1OxN7aaARYoQgpX3m94HgChBuDu_";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    const testWallet = "0x1d62df39f4D20119EcEEf66bFEE23c0afe49CeB8";
    const testCollection = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

    if(!collection.length) {
      var requestOptions = {
        method:'GET'
      };

      const fetchURL = `${baseURL}?owner=${wallet}&pageKey=${pageKey}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      // console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }
    if(nfts){
      console.log("nfts", nfts);
      console.log("number of nfts counted: ", nfts.totalCount);
      console.log(nfts.pageKey);
      setNFTs(nfts.ownedNfts);
      setPageKey(nfts.pageKey);
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length){
      // console.log("fetching nfts for collection");
      var requestOptions = {
        method:'GET'
      };

      const api_key = "LpaM1OxN7aaARYoQgpX3m94HgChBuDu_";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if (nfts){
        console.log("NFTs in collection", nfts);
        console.log("number of nfts in this collection: ", nfts.nfts.length);
        setNFTs(nfts.nfts);
      }
  
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={
          (e)=>{
            setWalletAddress(e.target.value);
            setPageKey('');
          }} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add your collection address"></input>
        <label className="text-gray-600" ><input  className="mr-2" onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}></input>Fetch for collection</label>
        <button  className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          ()=>{
            if(fetchForCollection){
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }
        }>Let's Go!</button>
        <button  className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} hidden={fetchForCollection || !pageKey} onClick={
          ()=>{
            fetchNFTs()
          }
        }>Next...</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
       {  
          NFTs.length && NFTs.map(nft => {
            if(nft.media[0].gateway){
              counter = counter + 1;
              data = [nft, counter];
              return (
                <NFTCard data={data}></NFTCard>
              )
            } else {
              return ("")
            }
          })
        }
      </div>
    </div>
  )
}

export default Home
