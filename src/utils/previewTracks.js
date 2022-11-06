let TracksTableItem = ({name}) =>
    <tr>
        <td>
            <span className="text-dark">  {name}</span>
        </td>
    </tr>

export  const PreViewTracks = (preTracks) => {
    if (preTracks && preTracks.length > 0) {
        return (
            <div className="preview-tracks-block">
                <table className="table table-light table-hover align-middle sticky-top bg-light">
                    <thead>
                        <tr>
                            <th>
                                Loaded files
                            </th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-light table-hover align-middle">
                    <tbody>
                        {Array.from(preTracks).map((preTracks, i) => <TracksTableItem name={preTracks.name} key={i}></TracksTableItem>)}
                    </tbody>
                </table>
            </div>
        )
    }
}