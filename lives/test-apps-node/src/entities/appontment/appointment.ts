interface AppointmentProps {
  customer: string
  startsAt: Date
  endsAt: Date
}

export class Appointment {
  private props: AppointmentProps

  get customer (): string {
    return this.props.customer
  }

  get startsAt (): Date {
    return this.props.startsAt
  }

  get endsAt (): Date {
    return this.props.endsAt
  }

  constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props

    if (endsAt <= startsAt) {
      throw new Error('Invalid Date')
    }
    this.props = props
  }
}
