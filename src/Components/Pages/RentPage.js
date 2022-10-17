import React from "react";
const sampleData = {
  success: true,
  error_code: 0,
  description: "location details",
  info: [
    {
      id: 1,
      name: "Buchanon",
      address: "NE4 5PH",
      total_bikes: 2,
    },
    {
      id: 2,
      name: "Argyle",
      address: "NE5 5PH",
      total_bikes: 4,
    },
    {
      id: 3,
      name: "Sauchiehall",
      address: "NE7 5PH",
      total_bikes: 5,
    },
    {
      id: 4,
      name: "University of Glasgow",
      address: "NE4 5PH",
      total_bikes: 10,
    },
    {
      id: 5,
      name: "West view",
      address: "NE5 5PH",
      total_bikes: 6,
    },
    {
      id: 6,
      name: "Blackfriar",
      address: "NE6 5PH",
      total_bikes: 9,
    },
  ],
};
function RentPage() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="card my-3" style={{ minWidth: "23rem" }}>
            <div className="card-body">
              <p className="card-title display-6 gray">Select Location</p>
              <div className="list-group">
                {
                  sampleData.info.map((element) => {
                    return(
                      <button  key={element.id} type="button" className="button1 list-group-item list-group-item-action">
                        {element.name}
                        <p className="text-muted">{element.address}</p>
                        <p className="text-danger">{element.total_bikes}</p>
                      </button>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentPage;
