import React from 'react'
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
        }
    ]
}
function BikesPage() {
  return (
    <div>BikesPage</div>
  )
}

export default BikesPage