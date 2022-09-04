

export default function Profile() {
    return (
        <div className="d-flex flex-row">
            <img src="https://picsum.photos/300/300" class="rounded-circle float-start" />
            <div className="d-flex flex-column mx-auto">
                <h1>Name</h1>
                <p>Description</p>
            </div>
        </div>
    );
}