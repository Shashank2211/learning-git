import React from 'react'

export const queries = [
    React.searchUserFromFirstname = `
        query FetchAll {
            user(where: {is_active: {_eq: true}}, order_by: {first_name: asc}) {
                first_name
                id
                is_active
                phoneNumber
                image_id
                username
                last_name
                city
                email
                country
                address
                gender
                dob
                created_at
            }
        }
    `,
    `
        mutation UpdateFirstname($first_name: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {first_name: $first_name}) {
                affected_rows
                returning {
                    first_name
                }
            }
        }
    `,
    `
        mutation UpdateLastname($last_name: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {last_name: $last_name}) {
                affected_rows
                returning {
                    last_name
                }
            }
        }
    `,
    `
        mutation UpdateUsername($username: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {username: $username}) {
                affected_rows
                returning {
                    username
                }
            }
        }
    `,
    `
        mutation UpdateEmail($email: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {email: $email}) {
                affected_rows
                returning {
                    email
                }
            }
        }
    `,
    `
        mutation UpdatePhoneNumber($phoneNumber: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {phoneNumber: $phoneNumber}) {
                affected_rows
                returning {
                    phoneNumber
                }
            }
        }
    `,
    `
        mutation UpdateCountry($country: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {country: $country}) {
                affected_rows
                returning {
                    country
                }
            }
        }
    `,
    `
        mutation UpdateAddress($address: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {address: $address}) {
                affected_rows
                returning {
                    address
                }
            }
        }
    `,
    `
        mutation UpdateGender($gender: String = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {gender: $gender}) {
                affected_rows
                returning {
                    gender
                }
            }
        }
    `,
    `
        mutation UpdateDob($dob: timestamp = "", $_eq: uuid = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {dob: $dob}) {
                affected_rows
                returning {
                    dob
                }
            }
        }
    `,
    `
        query GetGlobalPoints($_eq: uuid = "") {
            leaderboardconnection(where: {leaderboard: {name: {_eq: "Global"}}, _and: {user: {id: {_eq: $_eq}}}}, order_by: {global_points: desc}) {
                global_points
                user {
                    first_name
                    id
                }
            }
        }
    `,
    `
        query GetActivityData($_eq: uuid = "") {
            useractivitydata(where: {user: {is_active: {_eq: true}, id: {_eq: $_eq}}}) {
                klicks
                calories
                steps
                stream
                comment
                min
                id
            }
        }
    `,
    `
        mutation UpdateCreatedAt($_eq: uuid = "", $created_at: timestamp = "") {
            update_user(where: {id: {_eq: $_eq}}, _set: {created_at: $created_at}) {
                affected_rows
                returning {
                    created_at
                }
            }
        }
    `,
    `
        query GetActivityDates($_eq: uuid = "") {
            useractivitydata(where: {user: {id: {_eq: $_eq}}}) {
                date
                updated_date
            }
        }
    `
]

export const activityQueries = [
    `
        mutation UpdateKlicks($klicks: Float, $_eq: uuid = "") {
            update_useractivitydata(where: {id: {_eq: $_eq}}, _set: {klicks: $klicks}) {
                affected_rows
                returning {
                    klicks
                }
            }
        }
    `,
    `
        mutation UpdateCalories($_eq: uuid = "", $calories: String = "") {
            update_useractivitydata(_set: {calories: $calories}, where: {id: {_eq: $_eq}}) {
                affected_rows
                returning {
                    calories
                }
            }
        }
    `,
    `
        mutation UpdateSteps($steps: String = "", $_eq: uuid = "") {
            update_useractivitydata(where: {id: {_eq: $_eq}}, _set: {steps: $steps}) {
                affected_rows
                returning {
                    steps
                }
            }
        }
    `,
    `
        mutation UpdateStream($stream: String = "", $_eq: uuid = "") {
            update_useractivitydata(where: {id: {_eq: $_eq}}, _set: {stream: $stream}) {
                affected_rows
                returning {
                    stream
                }
            }
        }
    `,
    `
        mutation UpdateComment($comment: String = "", $_eq: uuid = "") {
            update_useractivitydata(where: {id: {_eq: $_eq}}, _set: {comment: $comment}) {
                affected_rows
                returning {
                    comment
                }
            }
        }
    `,
    `
        mutation UpdateMins($min: String = "", $_eq: uuid = "") {
            update_useractivitydata(where: {id: {_eq: $_eq}}, _set: {min: $min}) {
                affected_rows
                returning {
                    min
                }
            }
        }
    `
]
