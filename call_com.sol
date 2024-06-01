// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract call_com 
{

    // Structure to store the contact details
    struct number_list
     {
        uint msisdn;
        uint imsi;
        string region;
        string owner;
        
        
    }

    uint public starttime;
    uint public endtime;
    uint public rate=100 ether;


    // Declaring the list of number list
    number_list[] num_lists;
    mapping(uint => number_list) public nos;
    mapping(uint => number_list) public id;
    //mapping is basically  indexing
    // Function to add numbers to the array of structure
    function addNumbers (uint _msisdn, uint _imsi, string memory _region, string memory _owner ) public
     {
        number_list memory x = number_list(_msisdn,_imsi, _region, _owner);
        num_lists.push(x);
        number_list memory y = number_list(_msisdn,_imsi, _region, _owner);
        num_lists.push(y);
        nos[_msisdn] = x;
        id[_imsi] = y;
    }

    // Function to show the list of numbers
    function showNumbers() public view returns (number_list[] memory)
     {
        number_list[] memory x = new number_list[](num_lists.length);
        number_list[] memory y = new number_list[](num_lists.length);
        for (uint _i=0; _i<num_lists.length; _i++) 
        {
            x[_i] = num_lists[_i];
            y[_i] = num_lists[_i];
        }

        return x;
    }

    // Function for call initiation
    function call_initiation(uint _caller, uint _receiver, string memory _location ) public returns(string memory)
     {

        uint _flag1 = 0;
        uint _flag2 = 0;
        string memory response = "";

        for (uint _i = 0; _i< num_lists.length; _i++)
         {
            if (num_lists[_i].msisdn == _caller && num_lists[_i].imsi== _caller) 
            {
                _flag1 = 1;
                break;
            }
        }

        for (uint _i = 0; _i< num_lists.length; _i++) 
        {
            if (num_lists[_i].msisdn == _receiver && num_lists[_i].imsi==_caller) 
            {
                _flag2 = 1;
                break;
            }
        }

        if (_flag1 == 0 || _flag2 == 0) 
        {
            response = "Not valid numbers";
        }

        else 
        {
            string memory response2 = roaming (_caller, _receiver, _location);
            starttime = block.timestamp;

            response = string(abi.encodePacked(response2," Call start time: ", Strings.toString(starttime)));
        }

        return response;
    }

    // Function to check roaming
    function roaming(uint _caller, uint _receiver, string memory _location) public view returns(string memory) 
    {

        uint _flag1 = 0;
        uint _flag2 = 0;
        string memory response = "";

        for (uint _i = 0; _i< num_lists.length; _i++) 
        {
            if (num_lists[_i].msisdn == _caller) {
                if (keccak256(abi.encodePacked(num_lists[_i].region)) == keccak256(abi.encodePacked(_location))) 
                {
                    _flag1 = 1;
                    break;
                } 
            }
        }

        for (uint _i = 0; _i< num_lists.length; _i++)
         {
            if (num_lists[_i].msisdn == _receiver) 
            {
                if (keccak256(abi.encodePacked(num_lists[_i].region)) == keccak256(abi.encodePacked(_location))) 
                {
                    _flag2 = 1;
                    break;
                } 
            }
        }

        if (_flag1 == 1 && _flag2 == 1)
         {
            response = "Not roaming";
        }
        else 
        {
            response = "Roaming";
        }

        return response;
    }

    function call_termination(uint _caller, uint _receiver) public returns (string memory) 
    {
        
        endtime = block.timestamp;
        uint timediff = endtime - starttime;
        timediff=timediff/1 minutes;
        uint256 dd;
        uint256 hh; 
        uint256 mm;
        uint256 ss;

        dd = timediff / 1 days; // Calculate days directly from seconds
        timediff -= dd * 1 days; // Subtract days from the total time

        hh = timediff / 1 hours;
        timediff -= hh * 1 hours;

        mm = timediff / 1 minutes;
        timediff -= mm * 1 minutes;

        ss = timediff;

        string memory response = string(abi.encodePacked("Call ended on: ", Strings.toString(endtime), ", Duration: ", Strings.toString(dd), " Days, ", Strings.toString(hh), " Hours, ", Strings.toString(mm), " Minutes, ", Strings.toString(ss), " Seconds"));
        return response;
    
        
        
    }
     function billingupdate(uint _caller, uint _receiver) view  public returns (string memory) 
    {
        uint256 call_duration = (endtime - starttime) / 1 minutes;

       
        uint256 bill = call_duration * rate;

        string memory response = string(abi.encodePacked("Call duration ", Strings.toString(call_duration), " minutes, bill: ", Strings.toString(bill), "ether"));
        return response;
    }
}