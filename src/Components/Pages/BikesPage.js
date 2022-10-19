import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBattery5, faBattery3, faBattery1 } from '@fortawesome/free-solid-svg-icons'

const sampleData = {
    "success": true,
    "error_code": 0,
    "description": "vehicle in given location id",
    "info": [
        {
            "id": 2,
            "type": "electric_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
        {
            "id": 2,
            "type": "electric_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
        {
            "id": 2,
            "type": "electric_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
        {
            "id": 4,
            "type": "gas_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
        {
            "id": 3,
            "type": "electric_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
        {
            "id": 2,
            "type": "electric_scooter",
            "battery": 100,
            "is_defective": false,
            "is_available": true,
            "assigned_to_id": null,
            "location_id": 1
        },
    ]
}
function BikesPage() {
    return (
      <div className="container-fluid">
          <div className="row justify-content-center">
              <div className="col-12 text-center">
                  <div className="card my-3" style={{minWidth: "23rem"}}>
                      <div className="card-body">
                          <p className="card-title display-6 gray">Bike</p>
                          {
                            sampleData.info.map((element) => {
                              return(
                        
                                  <ul class="list-group">
                                  <li class="list-group-item">ID: {element.id}</li>
                                  <li class="list-group-item">Type: {element.type}</li>
                                  <li class="list-group-item">Battery: {element.battery}</li>
                                  <li class="list-group-item">Location ID: {element.location_id}</li>
                                  
                                </ul>
                              )
                            })
                          }
                 
                  
                          
                      </div>
                  </div>   
              </div>
          </div>
      </div>
  )
}

export default BikesPage