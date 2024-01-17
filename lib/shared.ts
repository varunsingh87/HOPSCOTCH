enum Access {
  INITIAL = 'Public',
  PUBLIC = 'Public',
  BY_APPLICATION = 'By Application',
  INVITE_ONLY = 'Invite Only',
}

enum RequestValidity {
  /**
   * The user is already on that team
   */
  BACKWARDS = -3,
  /**
   * The user is already on a multi-person team
   */
  COMMITTED,
  /**
   * The team is already at capacity (4)
   */
  FULL,
  /**
   * A request is valid but neither side has consented
   */
  VALID,
  /**
   * The team consented but the user has not
   */
  INVITED,
  /**
   * The user consented but the team has not
   */
  REQUESTED,
  /**
   * Both the user and the team have consented
   */
  ACCEPTED,
}

export { Access, RequestValidity }
