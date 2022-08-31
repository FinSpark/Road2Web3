import {FaRegCopy} from 'react-icons/fa';

export const NFTCard = ({data}) => {
    const nft = data[0];
    const counter = data[1];
    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    <p className="text-gray-600">{nft.id.tokenId.substring(nft.id.tokenId.length - 4)}</p>
                    <p className="text-gray-600" >{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                    <span className="mr-1">
                        <input id={`contract_address_${counter}`} name={`contract_address_${counter}`} value={nft.contract.address} type="hidden"></input>
                        <span className="cursor-pointer active:text-gray-400" onClick={
                            ()=>{
                                if(navigator.clipboard){
                                    const copyText = nft.contract.address;
                                    console.log(copyText);
                                    navigator.clipboard.writeText(copyText).then(()=>{
                                        // alert('Copied to clipboard using navigator.clipboard');
                                    })
                                } else {
                                    const copyElement = document.getElementById("contract_address_" + counter);
                                    copyElement.type = "text";
                                    copyElement.select();
                                    document.execCommand('copy');
                                    copyElement.type = "hidden";
                                    // alert('Copied to clipboard using document.execCommand.');
                                }
                            }}>
                            <FaRegCopy/></span>
                    </span>
                </div>
                <div className="flex-grow mt-2 mb-2">
                    <p className="text-gray-600">{nft.description?.substr(0,150)}</p>
                </div>
                <div className="flex justify-center mb-1">
                    <a target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}  className="py-2 px-4 bg-gray-500 w-4/5 text-center text-sm rounded-m text-white cursor-pointer">View on etherscan</a>
                </div>
            </div>
        </div>
    )
}