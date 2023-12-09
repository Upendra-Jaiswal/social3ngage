// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Challenge {
    address admin;

    struct Challenge {
        string challengeName;
        uint256 postRequired;
        uint256 duration; // Time in seconds
        uint256 challengeEndTime; // Challenge end time in seconds
    }

    struct Participant {
        string name;
        uint256 challenge;
        uint256 noOfPost;
    }

    Challenge[] private challenges;

    mapping(address => Participant) private participants;

    address[] private participantAddresses;

    /// The Challenge Time has got expired
    error ChallengeTimeExpired();

    event ChallengeExpired(
        uint256 indexed challengeIndex,
        string challengeName
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function joinAChallenge(
        uint256 challengeIndex,
        string memory participantName
    ) external {
        require(challengeIndex < challenges.length, "Invalid challenge index");
        require(msg.sender != admin, "Admin cannot join challenges");

        address participant = msg.sender;
        participants[participant].name = participantName;
        participants[participant].challenge = challengeIndex;
        participants[participant].noOfPost = 0;
        participantAddresses.push(participant);
    }

    function addAPost() external {
        address participant = msg.sender;
        require(
            participants[participant].challenge < challenges.length,
            "Invalid challenge index"
        );
        participants[participant].noOfPost += 1;
    }

    // function checkChallengeStatusAndFindWinner(uint256 challengeIndex)
    //     external
    // {
    //     require(challengeIndex < challenges.length, "Invalid challenge index");
    //     Challenge storage challenge = challenges[challengeIndex];

    //     if (block.timestamp >= challenge.challengeEndTime) {
    //         emit ChallengeExpired(challengeIndex, challenge.challengeName);
    //         findWinners(challengeIndex);
    //     } else {
    //         revert("Challenge is still ongoing");
    //     }
    // }

// function findWinners(uint challengeIndex) private view {
//     Challenge storage challenge = challenges[challengeIndex];

//     for (uint i = 0; i < participantAddresses.length; i++) {
//         address participantAddress = participantAddresses[i];
//         Participant storage participant = participants[participantAddress];

//         if (participant.challenge == challengeIndex && participant.noOfPost == challenge.postRequired) {

//         }
//     }
// }



    // Other functions...

    // Admin-only function to add challenges
    function addChallenge(
        string memory chaName,
        uint256 chaPostRequired,
        uint256 chaDuration
    ) external onlyAdmin {
        challenges.push(
            Challenge({
                challengeName: chaName,
                postRequired: chaPostRequired,
                duration: chaDuration,
                challengeEndTime: block.timestamp + chaDuration
            })
        );
    }

    // Admin-only function to set challenge end time (for testing purposes)
    function setChallengeEndTime(uint256 challengeIndex, uint256 endTime)
        external
        onlyAdmin
    {
        require(challengeIndex < challenges.length, "Invalid challenge index");
        challenges[challengeIndex].challengeEndTime = endTime;
    }
}