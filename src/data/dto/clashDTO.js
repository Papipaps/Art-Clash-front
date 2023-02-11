const clashDTO = {
  id: "",
  ownerId: "",
  title: "",
  theme: "",
  description: "",
  contestants: [],
  createdDate: new Date(),
  status: "",
  likes: 0, 
  ownerName: "", 
  podium: {
    first:"",
    second:"",
    thrid:"",
  },
  round: 0,
  currentRound: 0,
  restricted: false,
  slot: 0,
};

export default clashDTO;
