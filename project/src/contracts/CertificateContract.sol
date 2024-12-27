// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateContract {
    struct Certificate {
        string studentName;
        string course;
        uint256 issueDate;
        bool isValid;
    }
    
    mapping(bytes32 => Certificate) public certificates;
    address public owner;
    
    event CertificateIssued(bytes32 indexed hash, string studentName, string course);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can issue certificates");
        _;
    }
    
    function issueCertificate(
        bytes32 hash,
        string memory studentName,
        string memory course,
        uint256 issueDate
    ) public onlyOwner {
        require(certificates[hash].isValid == false, "Certificate already exists");
        
        certificates[hash] = Certificate({
            studentName: studentName,
            course: course,
            issueDate: issueDate,
            isValid: true
        });
        
        emit CertificateIssued(hash, studentName, course);
    }
    
    function verifyCertificate(bytes32 hash) public view returns (bool) {
        return certificates[hash].isValid;
    }
}