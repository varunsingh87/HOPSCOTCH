import React from "react"

function SubmissionViewer() {
    return (
        <div class="card">
            <img src="https://picsum.photos/500/500"
                class="card-img-top"
                height="100px"
                width="auto"
                style={{ objectFit: "cover" }} />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    );
}

function SubmissionsList() {
    return (
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <SubmissionViewer />
            </div>
            <div class="col">
                <SubmissionViewer />
            </div>
            <div class="col">
                <SubmissionViewer />
            </div>
        </div>
    )
}

export default function Profile() {
    return (
        <div>
            <div className="d-flex flex-row">
                <img src="https://picsum.photos/300/300" width="200" height="200" className="rounded-circle float-start pt-3" />
                <div className="d-flex flex-column ms-5 me-auto">
                    <h1 className="display-1">FName LName</h1>
                    <p>Bitters farm-to-table letterpress, 90's celiac pok pok pork belly raw denim pitchfork post-ironic big mood listicle tousled fingerstache synth. Post-ironic meditation unicorn, health goth gluten-free retro asymmetrical seitan coloring book DSA ramps chicharrones hammock kale chips synth. Hella enamel pin post-ironic brunch, butcher taiyaki JOMO humblebrag cardigan dreamcatcher. PBR&B viral next level distillery vinyl. Migas distillery kickstarter taxidermy sartorial jean shorts craft beer, vape hella.</p>
                </div>
            </div>
            <SubmissionsList />
        </div>
    );
}