pragma solidity ^0.4.17;

contract CampaignFactory{

   address[] public deployedcampaigns;

   function createCampaign(uint min)public{
      address newCampaign= new Campaign(min, msg.sender);
      deployedcampaigns.push(newCampaign);

   }
   function getDeployCampaigns() public view returns(address[]){
       return deployedcampaigns;
   }

}



contract Campaign {

    struct Request{
       string description;
       uint value;
       address recipient;
       bool complete;
       uint approvalCount;
       mapping(address => bool) approvals;
   }
   // varibles
   Request[] public requests;
   address public manager;
   uint public miniumContribution;
   mapping(address => bool) public approvers;
   uint approversCount;


   // modifiers
     modifier restricted (){
      require (msg.sender == manager);
      _;
  }
   function Campaign(uint minCon, address creator) public {
      manager = creator;
      miniumContribution = minCon;
  }

   function contribute() public payable {
       require (msg.value > miniumContribution);
       approvers[msg.sender] =true;
       approversCount++;

   }


   function createRequest(string description, uint value, address recipient)
   public restricted {
       Request memory newRequest = Request({
       description: description,
       value: value,
       recipient: recipient,
       complete: false,
       approvalCount: 0

       });
       requests.push(newRequest);
   }

   function aproveReqest(uint index) public{
       Request storage request = requests[index];

       require(approvers[msg.sender]);
       require(!request.approvals[msg.sender]);

       request.approvals[msg.sender]=true;
       request.approvalCount++;


   }
   function finalizeReqest(uint index)public restricted{
       Request storage request = requests[index];

       require(request.approvalCount >(approversCount/2));
       require(!request.complete);

       request.complete =true;
       request.recipient.transfer(request.value);
     }

       function getSummary() public view returns(uint,uint, uint, uint, address){
         return(
           miniumContribution,
           this.balance,
           requests.length,
           approversCount,
           manager
           );
       }

       function getReqestCount() public view returns (uint){
         return requests.length;
       }



}
