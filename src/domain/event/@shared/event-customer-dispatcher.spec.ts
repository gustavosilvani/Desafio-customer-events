import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer/customer-address-changed-event";
import CustomerCreatedEvent from "../customer/customer-created-1.event";
import LogWhenCustomerAddressChanged from "../customer/handler/log-when-customer-address-changed.handler";
import LogWhenCustomerCreated1 from "../customer/handler/log-when-customer-created-1.handler";
import LogWhenCustomerCreated2 from "../customer/handler/log-when-customer-created-2.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  enum eventName {
    CustomerCreatedEvent = "CustomerCreatedEvent",
    CustomerAddressChangedEvent = "CustomerAddressChangedEvent",
  }
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0]
    ).toMatchObject(EventHandlerCustomerCreated1);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][1]
    ).toMatchObject(EventHandlerCustomerCreated2);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregister(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.unregister(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.unregister(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const EventHandlerCustomerCreated1 = new LogWhenCustomerCreated1();
    const EventHandlerCustomerCreated2 = new LogWhenCustomerCreated2();
    const EventHandlerCustomerAddressChanged2 =
      new LogWhenCustomerAddressChanged();

    const spyEventHandler1 = jest.spyOn(EventHandlerCustomerCreated1, "handle");
    const spyEventHandler2 = jest.spyOn(EventHandlerCustomerCreated2, "handle");
    const spyEventHandler3 = jest.spyOn(
      EventHandlerCustomerAddressChanged2,
      "handle"
    );

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0]
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][1]
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent][0]
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    const customer = new Customer("c1", "Customer 1");
    const customerCreated1Event = new CustomerCreatedEvent(null);
    const customerCreated2Event = new CustomerCreatedEvent(null);
    const address = new Address("street", 30, "62823-000", "city");

    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerCreated1Event);
    eventDispatcher.notify(customerCreated2Event);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
