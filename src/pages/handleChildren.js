function dataWithoutChildren(person) {
    return {
        name: person.name,
        attributes: {
            id: person.id
        },
        personInfo: person,
    }
}

function dataWithChildren(person) {
    if (person.direct_children && person.direct_children.length !== 0 && person.direct_children[0].direct_children?.length !== 0) {
        return {
            name: person.name,
            personInfo: person,
            attributes: {
                id: person.id
            },
            children: person.direct_children?.map(dataWithChildren)
        }
    } else {
        return {
            name: person.name,
            personInfo: person,
            attributes: {
                id: person.id
            },
            children: person.direct_children?.map(dataWithoutChildren)
        }
    }
}


function checkThenHandle(person) {
    if (person.direct_children && person.direct_children.length !== 0) {
        return dataWithChildren(person)
    } else {
        return dataWithoutChildren(person)
    }
}


export default function finalData(people) {
    let result = {
		name: "العائلة",
		children: []
	}

    people.forEach(person => {
        if (!person.father) {
            let personChildsData = [];
            
            if (person.direct_children?.length !== 0) {
                person.direct_children?.forEach((child) => {
                    personChildsData.push(checkThenHandle(child))
                })
            }

            result.children.push({
                name: person.name,
                personInfo: person,
                attributes: {
                    id: person.id
                },
                children: personChildsData
            })
        }   
    })

    return result
}