import { useEffect, useState } from "react";
import { Container, Form, FormGroup } from "reactstrap";
import { useMutation } from "../convex/_generated/react";

export default function App(props) {
    const [name, setName] = useState('user name');
    useEffect(() => {
        const randomName = "User " + Math.floor(Math.random() * 10000);
        setName(randomName);
    }, [])

    async function handleAddCompetition(event) {
        event.preventDefault();
        setNewCompetitionName(""); // reset text entry box
        await addCompetition(newCompetitionName, name);
    }

    const [newCompetitionName, setNewCompetitionName] = useState("");
    const addCompetition = useMutation("addCompetition");

    return (
        <Container>
            <Form
                onSubmit={handleAddCompetition}
                className="d-flex justify-content-center"
            >
                <input
                    value={newCompetitionName}
                    onChange={event => setNewCompetitionName(event.target.value)}
                    className="form-control w-50"
                    placeholder="Create a new musathon"
                />
                <FormGroup>
                    <input
                        type="number"
                    />
                </FormGroup>

                <input
                    type="submit"
                    value="Create"
                    className="ms-2 btn btn-primary"
                    disabled={!newCompetitionName}
                />
            </Form>
        </Container>
    )
}