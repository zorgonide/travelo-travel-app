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
    <div>BikesPage</div>
  )
}

export default BikesPage